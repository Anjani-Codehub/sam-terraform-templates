# ----------------------------------------------------------------------
# Default AWS Region used to deploy resources
# ----------------------------------------------------------------------
variable "aws_region" {
  default = "us-east-1"
}

# ----------------------------------------------------------------------
# Application name used for naming resources
# ----------------------------------------------------------------------
variable "app_name" {
  default = "merchants-details"
}

# ----------------------------------------------------------------------
# Lambda functions, used to retrieve function ARN CFN exports
# ----------------------------------------------------------------------
variable "api_lambda_functions" {
  default = [
    "get-data",
    "put-data"
  ]
}


# ----------------------------------------------------------------------
# S3 bucket for converted SAM templates
# ----------------------------------------------------------------------
variable "sam_code_bucket" {
  default = "merchants-details"
}
