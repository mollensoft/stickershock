import mojo from '@mojojs/core';

const app = mojo();


function fetchRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// GET /
app.get('/', async ctx => {
  let srandx = fetchRandomInteger(1000000, 999999999999999);
  await ctx.render({text: 'API Gateway V0.43 (SecurityKey: ' + srandx + ')'});
});

// GET /hello
app.get('/contact', async ctx => {
  await ctx.render({text: 'Contact UNK API Client'});
});

// PUT /hello
app.get('/contact', async ctx => {
  const size = Buffer.byteLengt(await ctx.req.buffer());
  await ctx.render({text: `You uploaded ${size} bytes to /contact.`});
});

// GET|POST|PATCH /bye
app.any(['GET', 'POST', 'PATCH'], '/bye', async ctx => {
  await ctx.render({text: 'Signed Depart'});
});

// * /whatever
app.any('/inline', async ctx => {
  ctx.stash.one = 23;
  await ctx.render({inline: apiTemplate}, {two: 24});
});



app.start();

const apiTemplate = `
The API select numbers are <%= one %> and <%= two %>.
`;