const {test, expect} = require("@playwright/test");

test('user can add a task', async({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskTest = await page.textContent('.task');
    expect(taskTest).toContain('Test Task');
});

test('user can delete a task', async({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .delete-task');
    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');
});

test('mark task as complete', async({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull;
});

test('user can filter tasks', async({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.selectOption('#filter', 'Completed');
    const incompletedTask = await page.$('.task:not(.completed)');
    expect(incompletedTask).toBeNull;
});