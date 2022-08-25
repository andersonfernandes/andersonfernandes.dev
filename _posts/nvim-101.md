---
title: NeoVim 101
description:
date: '2022-08-28'
updated:
---

In this article I'm going to show how you can go from a fresh install of NeoVim (**nvim** as shorthand) to a ready-for-code setup.

First of all you need to have nvim installed, check out their [installation guide](https://github.com/neovim/neovim/wiki/Installing-Neovim) on Github for the steps. Since the project is growing fast, consider installing the latest stable version to get the new features.

## A bit of context

Once you have it installed, let's learn some basic concepts of how the nvim configuration works.

NeoVim will load the user configs from a `init.lua`(or `init.vim`) file located at one of those folders:

- In Unix: `~/.config/nvim/`
- In Windows: `~/AppData/Local/nvim/`
- Or if the env $XDG_CONFIG_HOME is set: `$XDG_CONFIG_HOME/nvim/`

Here is files structure that we are going to use:

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

The file **`init.lua`** is our startup file, the whole config that we are going to do will be sourced here.

In the folder `lua` will be placed our lua files and modules. Each subfolders can have an `init.lua` file that will be used as an startpoint of the folder (like an `index.html`). We are going to create one module called `custom`, containing all of our main config files, like keymaps and plugins.

The folder `after/plugin` will contain files that will be automatically sourced by nvim after the config placed at the root `init.lua`. Here we will do some post configurations like enabling and customizing plugins.

## NeoVim 🤝 Lua

NeoVim includes support to be configured using Lua, you can require any fie or module placed under the `lua` folder. The `vim` module is automatically required and available globally at any lua file. Check the [nvim docs](https://neovim.io/doc/user/lua.html) for a full list of functions and modules that can be used.

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

with this piece of code we are setting some global configs like enabling line numnbers to be shown, configuring indentation and setting the mapleader to `<space>` (I will explain more about it in the remaps section).

## Plugins

- Talk about packer.lua
- Main plugins(morhetz/gruvbox, eoclide/coc.nvim, dense-analysis/ale, junegunn/fzf.vim, tpope/vim-fugitive and mhinz/vim-signify, nvim-lualine/lualine.nvim and kyazdani42/nvim-tree.lua)
- lua/custom/set.lua

## Remaps

- ...
- add ref to the creator of keymap.lua (https://github.com/ThePrimeagen/.dotfiles/blob/master/nvim/.config/nvim/lua/theprimeagen/keymap.lua)

## Wrapping up

- Show my dotfiles
- Kudos to ThePrimeagen on migrating to lua

