# MineSweeper - React

## Description

This is a Minesweeper game built with React. It is a single page application that uses React components to render the game board and game pieces. The game board is a grid of cells that can be clicked on to reveal the cell's contents. The game pieces are mines, numbers, and empty cells. The mines are randomly placed on the board at the start of the game. The numbers represent the number of mines that are adjacent to the cell. The empty cells are cells that do not have any mines adjacent to them. When a cell is clicked on, the cell is revealed. If the cell is a mine, the game is over. If the cell is a number or empty cell, the cell is revealed and the game continues. If the cell is an empty cell, the empty cell and all adjacent empty cells are revealed. The game is won when all non-mine cells are revealed.

## Objectives

- Build a React application from scratch
- Good project structure
- Use `useContext` to pass data to deeply nested components
- Use `useEffect` to perform side effects
