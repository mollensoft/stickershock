import mojo from '@mojojs/core';
import lambdaPlugin from 'mojo-plugin-lambda';

const app = mojo();

//for Lambda
app.plugin(lambdaPlugin, {});
const handler = app.handler;
export { handler };
// Now, Set Lambdas entrypoint to appfile.handler



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


// Hide this for lambda Deploy
// app.start();  

if (! process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.start();
}

const apiTemplate = `
The API select numbers are <%= one %> and <%= two %>.
`;