import * as apigateway from "@pulumi/aws-apigateway";
import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";

const repo = new awsx.ecr.Repository("repo", {
    forceDelete: true,
});

const image = new awsx.ecr.Image("image", {
    repositoryUrl: repo.url,
    path: "./app",
    env: {
        DOCKER_DEFAULT_PLATFORM: "linux/amd64", // Omit, depending on your arch.
    }
});

const role = new aws.iam.Role("role", {
    assumeRolePolicy: {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "sts:AssumeRole",
                Effect: "Allow",
                Principal: {
                    Service: "lambda.amazonaws.com",
                },
            },
        ],
    },
});

new aws.iam.RolePolicyAttachment("attachment", {
    role,
    policyArn: aws.iam.ManagedPolicies.AWSLambdaExecute,
});

const lambda = new aws.lambda.Function("lambda", {
    packageType: "Image",
    imageUri: image.imageUri,
    role: role.arn,
});

const api = new apigateway.RestAPI("api", {
    routes: [
        {
            path: "/route",
            method: "GET",
            eventHandler: lambda,
        },
    ],
});

export const { url } = api;
