# aws-lambda-with-container-image

An Pulumi example of using a Docker container with a Lambda function to respond to API Gateway requests.

To use it, clone the repo, make sure you're installed and configured [Pulumi](https://www.pulumi.com/docs/install/) and [AWS](https://www.pulumi.com/registry/packages/aws/installation-configuration/), ensure Docker is running (as Pulumi will use it to build container images), install dependencies, and deploy!

```bash
yarn install
pulumi up
```

```
Updating (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/christian-pulumi-corp/container-with-api-gateway/dev/updates/10

     Type                             Name                            Status              Info
 +   pulumi:pulumi:Stack              container-with-api-gateway-dev  created (90s)
 +   ├─ awsx:ecr:Repository           repo                            created (2s)
 +   │  ├─ aws:ecr:Repository         repo                            created (0.49s)
 +   │  └─ aws:ecr:LifecyclePolicy    repo                            created (0.34s)
 +   ├─ aws:iam:Role                  role                            created (1s)
 +   ├─ aws:iam:RolePolicyAttachment  attachment                      created (0.57s)
 +   ├─ awsx:ecr:Image                image                           created (0.25s)     1 warning
 +   ├─ aws:lambda:Function           lambda                          created (19s)
 +   └─ aws-apigateway:index:RestAPI  api                             created (4s)
 +      ├─ aws:apigateway:RestApi     api                             created (1s)
 +      ├─ aws:apigateway:Deployment  api                             created (0.41s)
 +      ├─ aws:lambda:Permission      api-f0b6068d                    created (0.47s)
 +      └─ aws:apigateway:Stage       api                             created (0.44s)

Outputs:
    url: "https://4arwe6zpkh.execute-api.us-west-2.amazonaws.com/stage/"

Resources:
    + 13 created

Duration: 1m31s
```

```bash
curl $(pulumi stack output url)/route
"Hi, world!"
```
