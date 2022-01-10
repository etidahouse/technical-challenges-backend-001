![](https://github.com/winoteam/technical-challenges-backend/blob/master/wino-banner.png?raw=true)

# Wino Backend-Stack Hiring Test 001

Some people say that the universe's history is simply **a stream of events**, and the moment we live in right now, can be thought of as a result of aggregating all the previous events which led to it. But instead of thinking of the whole universe, **let's try to pick a small example: "the state of a warehouse"**.

The warehouse life story starts when it's empty, and then products come and go, in small or big amounts, and as time goes on, the state of the warehouse changes.

## Your mission

As a developer, your mission if you choose to accept it, will be to help us design and develop the system behind the scene that keeps track of the warehouse state.

### Some things that you should know

- **Most of the hard boring work is already done for you: a [`RabbitMQ`](https://www.rabbitmq.com) channel, a `cli.ts` file to create stock events ...**
- We don't care about warehouse details or product types. We just care about the history of what happens in the warehouse from the products stocks and inventory perspective, so you can over simplify the products representation to simply some random names and same thing for the warehouses.
- Feel free to clean or refactor the code if you think it is necessary

### Things you should pay attention to

- Take a moment to discover all the code base, we did our best to keep things simple.
- **Many developers before you tried with systems that when scaled in multiples instances ended up causing wrong stock results, so pay attention to that.**
- Also, many developers got stuck when managers asked them: "can you tell what was the warehouse products state on 16/11/2019 (the first day we discovered the Covid) ?".
- Keep an eye on how you code, cause if you're done in the time required, you'll most likly have to write some unit tests.

## One last thing

You will be using [`Typescript`](http://typescriptlang.org) and a few other scripting languages, don't worry, we will be here in case you're stuck, we don't want to waste much of your time. So use any [`Docker`](https://www.docker.com) image or `Javascript` package that you think can help you. **We will definitly appreciate any love and passion you might show in your code.**

**You are not alone, we are here to take you step by step.**
There are no perfect solutions, we want to see how you work and exchange on a given problem.

As always, should you or any of your associates be caught or killed, we will disavow any knowledge of your actions. This message will self-destruct in an hour and a half.

Good luck.
