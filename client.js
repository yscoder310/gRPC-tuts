const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('hello.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.Greeter('localhost:50051', grpc.credentials.createInsecure());

client.SayHello({ name: 'World' }, (error, response) => {
  if (!error) {
    console.log(response.message);
  } else {
    console.error(error);
  }
});