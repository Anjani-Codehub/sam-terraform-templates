# ----------------------------------------------------------------------
# AWS Provider
# ----------------------------------------------------------------------
provider "aws" {
  region = var.aws_region
}

# ----------------------------------------------------------------------
# Terraform S3 backend with DynamoDB Lock table
# ----------------------------------------------------------------------
terraform {
  backend "s3" {
    bucket         = "merchants-details"
    key            = "merchants-details.tfstate"
    dynamodb_table = "my-terraform-lock"
    region         = "us-east-1"
    encrypt        = "true"
  }
}
