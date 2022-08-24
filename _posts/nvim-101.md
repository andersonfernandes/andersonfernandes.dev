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

``` text
.
└── nvim/
    ├── init.lua
    ├── lua/
    │   ├── init.lua
    │   └── custom/
    │       └── init.lua
    └── after/
        └── plugin
```

The file **`init.lua`** is our startup file, the whole config that we are going to do will be sourced here.

In the folder `lua` will be placed our lua files and modules. This folder and subfolders can have an `init.lua` file that will be used as an startpoint of the folder (like an `index.html`). We are going to create one module called `custom`, containing all of our main config files, like keymaps and plugins.

The folder `after/plugin` will contain files that will be automativally sourced by nvim after the config placed at the root `init.lua`. Here we will do some post configurations like enabling and customizing plugins.

## NeoVim 🤝 Lua

Talk about vim lua interface.
- vim object
- vim.opt
- vim.g
- vim.cmd
- vim.api
- Talk about lua/custom/set.lua

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

