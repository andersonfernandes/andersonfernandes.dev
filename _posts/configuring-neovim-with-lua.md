---
title: Configuring NeoVim with Lua
description:
date: "2022-09-23"
updated:
---

In this article I'm going to show how you can go from a fresh install of NeoVim (**nvim** as shorthand) to a ready-for-code setup.

First of all you need to have nvim installed, check out their [installation guide](https://github.com/neovim/neovim/wiki/Installing-Neovim) on Github for the steps. Since the project is growing fast, consider installing the latest **stable** version to get the new features.

## A bit of context

Once you have it installed, let's learn some basic concepts of how the nvim configuration works.

NeoVim will load the user configs from a `init.lua`(or `init.vim`) file located at one of those folders:

- In Unix: `~/.config/nvim/`
- In Windows: `~/AppData/Local/nvim/`
- Or if the env $XDG_CONFIG_HOME is set: `$XDG_CONFIG_HOME/nvim/`

Here is the files structure that we are going to use:

```text --no-lines --no-copy
.
└── nvim/
    ├── init.lua
    ├── lua/
    │   └── custom/
    │       └── init.lua
    └── after/
        └── plugin
```

The file `init.lua` is our startup file, the whole config that we are going to do will be sourced from here.

At the folder `lua` will be placed our .lua files and modules. Each subfolder can have an `init.lua` file that will be used as an startpoint of the module (like an `index.html`).

We are going to create one module called `custom`, containing all of our main config files, like keymaps and plugins management.

The folder `after/plugin` will contain files that will be automatically sourced by nvim after the file `init.lua` finishes its execution. Here we will do some post configurations like enabling and customizing plugins.

## NeoVim 🤝 Lua

NeoVim include support to be configured using Lua, you can require any fie or module placed under the `lua` folder. The `vim` module is automatically required and available globally at any lua file. Check the [nvim docs](https://neovim.io/doc/user/lua.html) for a full list of functions and modules that can be used.

With that in mind lets add some initial config creating the `lua/custom/set.lua`:

```lua
vim.opt.nu = true
vim.opt.errorbells = false
vim.opt.incsearch = true
vim.opt.hidden = true
vim.opt.wrap = false
vim.opt.modifiable = true
vim.opt.inccommand = "split"
vim.opt.clipboard = "unnamedplus"

vim.opt.autoindent = true
vim.opt.smartindent = true
vim.opt.smarttab = true
vim.opt.expandtab = true
vim.opt.shiftwidth = 2
vim.opt.softtabstop = 2
vim.opt.tabstop = 2

vim.g.mapleader = ' '
```

With this piece of code we are setting some global configs like enabling line numnbers to be shown, configuring indentation and setting the mapleader to `<space>`.

Now we need to source the `set.lua` file into the root `init.lua` creating the file `lua/custom/init.lua`:

```lua
require("custom.set")
```

And also adding the require to the custom module at the root `init.lua`:

```lua
require("custom")
```

## Plugins

Since nvim is basically a text editor, we do not have features such code completion or an git integration out of the box.

To get those features working at our editor we can use some plugins. We are going to use [packer.nvim](https://github.com/wbthomason/packer.nvim) to help us manage our plugins.

The main plugins we are going to install are:

- [morhetz/gruvbox](https://github.com/morhetz/gruvbox): an AWESOME colorscheme.
- [nvim-lualine/lualine.nvim](https://github.com/nvim-lualine/lualine.nvim): help us to configure the statusline.
- [kyazdani42/nvim-tree.lua](https://github.com/kyazdani42/nvim-tree.lua): a file explorer.
- [junegunn/fzf.vim](https://github.com/junegunn/fzf.vim): integration between the [fzf](https://github.com/junegunn/fzf) command line tool with nvim. It will help us finding files and text into our projects(and also much more).
- [tpope/vim-fugitive](https://github.com/tpope/vim-fugitive): a git wrapper full of cool features.
- [mhinz/vim-signify](https://github.com/mhinz/vim-signify): show git diff on the sign column of the editor.
- [neoclide/coc.nvim](https://github.com/neoclide/coc.nvim): an extension host that will handle the management of our language servers and help us on the code completion and much more.
- [dense-analysis/ale](https://github.com/dense-analysis/ale): a lint engine, we can make it [communicate with coc.nvim](https://github.com/dense-analysis/ale#5iii-how-can-i-use-ale-and-cocnvim-together)

Lets add packer and install those plugins creating the file `lua/custom/plugins.lua`:

```lua
vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function()
  use 'wbthomason/packer.nvim'

  use 'morhetz/gruvbox'
  use 'kyazdani42/nvim-web-devicons'
  use 'kyazdani42/nvim-tree.lua'
  use 'nvim-lualine/lualine.nvim'

  use {'junegunn/fzf', dir = '~/.fzf', run = './install --all' }
  use 'junegunn/fzf.vim'

  use 'tpope/vim-fugitive'
  use 'mhinz/vim-signify'

  use 'dense-analysis/ale'
  use { 'neoclide/coc.nvim', branch = 'release' }
end)
```

Don't forget to add the require to the plugins file at the `lua/custom/init.lua` file:

```lua
require("custom.set")
require("custom.plugins")
```

We also need to add some post config at the `after/plugins` folder:

- Configuring the colorscheme at `after/plugin/color.lua`

  ```lua
  vim.cmd("syntax enable")
  vim.opt.background = "dark"

  vim.cmd("colorscheme gruvbox")
  ```

- Setting up coc.nvim at `after/plugin/completion.lua`

  ```lua
  -- Add your extensions here.
  -- Check the list of the available ones here: https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions
  vim.g.coc_global_extensions = {
  }

  -- This will enable code completion to be triggered using the <tab> key
  vim.cmd([[
    function! s:check_back_space() abort
      let col = col('.') - 1
      return !col || getline('.')[col - 1]  =~# '\s'
    endfunction

    inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#_select_confirm() :
      \ coc#expandableOrJumpable() ?
      \ "\<C-r>=coc#rpc#request('doKeymap', ['snippets-expand-jump',''])\<CR>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
  ]])

  vim.g.coc_snippet_next = '<tab>'
  ```

- Customizing fzf interface at `after/plugin/finder.lua`

  ```lua
  vim.g.fzf_layout = {
    window = {
      width = 0.7,
      height = 0.4
    }
  }

  vim.fn.setenv("FZF_DEFAULT_OPTS", "--reverse")
  ```

- Setup lualine at `after/plugin/lines.lua`

  ```lua
  require('lualine').setup {
    options = {
      theme = 'gruvbox-material',
      refresh = {
        statusline = 1000,
        tabline = 1000,
        winbar = 1000,
      },
    },
    sections = {
      lualine_a = {'mode'},
      lualine_b = {'branch', 'diff'},
      lualine_c = {'filename'},
      lualine_x = {'encoding', 'filetype'},
      lualine_y = {},
      lualine_z = {'location'}
    },
    tabline = {
      lualine_a = {'tabs'},
      lualine_b = {'filename'},
      lualine_c = {},
      lualine_x = {},
      lualine_y = {},
      lualine_z = {}
    },
    extensions = {
      'nvim-tree',
      'fugitive',
      'man',
    },
  }
  ```

- Setup nvim-tree at `after/plugin/tree.lua`
  ```lua
  require("nvim-tree").setup()
  ```

## Remaps

Another key point of building your nvim config is customizing the keybindings. To help on the remapping process we are going to reuse [this snnippet](https://github.com/ThePrimeagen/.dotfiles/blob/master/nvim/.config/nvim/lua/theprimeagen/keymap.lua) from theprimeagen dotfiles. Let's place it at the file `lua/custom/keymap.lua`:

```lua
local M = {}

local function bind(op, outer_opts)
    outer_opts = outer_opts or { noremap = true }

    return function(lhs, rhs, opts)
        opts = vim.tbl_extend("force",
            outer_opts,
            opts or {}
        )

        vim.api.nvim_set_keymap(op, lhs, rhs, opts)
    end
end

M.nmap = bind("n", {noremap = false})
M.nnoremap = bind("n")
M.vnoremap = bind("v")
M.xnoremap = bind("x")
M.inoremap = bind("i")

return M
```

We are defining a set of functions to support all kinds of vim mappings.

Now let's create the `lua/custom/remap.lua` with some usefull bindings:

```lua
local keymap = require("custom.keymap")
local nnoremap = keymap.nnoremap
local vnoremap = keymap.vnoremap
local inoremap = keymap.inoremap
local xnoremap = keymap.xnoremap
local nmap = keymap.nmap

nnoremap("Q", "<nop>")
nmap('<esc>', ':noh <CR>')

-- Add custom mappings here
```

And again, update the file `lua/custom/remap.lua` with require to the remap module:

```lua
require("custom.set")
require("custom.plugins")
require("custom.remap")
```

## Wrapping up

Now you have an NeoVim installation configured and ready to start coding.

At my [personal dotfiles](https://github.com/andersonfernandes/dotfiles/tree/main/config/nvim) I dig a little bit deeper into adding more plugins and remaps, so feel free to clone the repo and get some customization insights.

Also check out [ThePrimeagen youtube channnel](https://www.youtube.com/c/ThePrimeagen) to learn more about vim and programming in general.
