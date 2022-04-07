const Potion = require('../lib/Potion');
jest.mock("../lib/Potion");
console.log(new Potion());

const Player = require('../lib/Player');

test('creates a player object', () => {
  const player = new Player('Dave');

  expect(player.name).toBe("Dave");
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
)
});

test("gets player's health value", () => {
  const player = new Player ("Dave");

  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test("to check if player is alive or not, lol", () => {
  const player = new Player("Dave");

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});

test('subtracks from players health', () => {
  const player = new Player("Dave");
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);

  player.reduceHealth(99999);
  expect(player.health).toBe(0);
});

test('gets players attack value', () => {
  const player = new Player ("Dave");
  player.strength = 10;

  expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
  expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test("adds a potion to the inventory", () => {
  const player = new Player("Dave");
  const oldCount = player.inventory.length;

  player.addPotion(new Potion());

  expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test("uses a potion from the inventory", () => {
  const player = new Player("Dave");
  player.inventory = [new Potion(), new Potion (), new Potion()];
  const oldCount = player.inventory.length;

  player.usePotion(1);

  expect(player.inventory.length).toBeLessThan(oldCount);
});
