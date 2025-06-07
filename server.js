const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('hello.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

function main() {
  const PORT = process.env.PORT || 50051;
  const server = new grpc.Server();
  server.addService(proto.Greeter.service, { SayHello: sayHello });
  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`gRPC server running at 0.0.0.0:${PORT}`);
  });
}

main();