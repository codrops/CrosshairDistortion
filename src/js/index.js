import { Cursor } from './cursor';
import { MenuItem } from './menuItem';
// Splitting (used to split the menu item texts to spans/characters)
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';

// initialize Splitting
const splitting = Splitting();

// initialize custom cursor
const cursor = new Cursor(document.querySelector('.cursor'));

// Menu Items
[...document.querySelectorAll('.menu > a')].forEach(el => new MenuItem(el));

// mouse effects on all links
[...document.querySelectorAll('a')].forEach(link => {
    link.addEventListener('mouseenter', () => cursor.enter());
    link.addEventListener('mouseleave', () => cursor.leave());
});