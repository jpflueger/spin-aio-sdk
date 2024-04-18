// Insert existing OpenWhisk function here
export function main(params) {
  var name = params.name || 'World';
  return { payload: 'Hello, ' + name + '!' };
}
