var express = require("express");
var router = express.Router();
// Init AWS
var AWS = require("aws-sdk");
// Set the region
AWS.config.loadFromPath("./config/config.json");

/* GET All  listing. */

const ec2 = new AWS.EC2({ region: "us-east-1" });

/**
* @swagger
* components:
*  schemas:
*   AWSRegions:
*    type: object
*    properties:
*     status: 
*      type: boolean
*     result: 
*      type: array
*      items: 
*       type: object
*       properties: 
*         Endpoint: 
*           type: string
*         RegionName: 
*           type: string
*         OptInStatus: 
*           type: string
*   ErrorSchema:
*     type: object
*     properties:
*      status: 
*       type: boolean
*       default: false
*      message:
*       type: string

* paths:
*   /api:
*     get:
*      summary: List's all AWS regions
*      tags: [Regions]
*      operationId: listRegions
*      description: |
*       Return a list of all available AWS regions
*      responses:
*       200:
*         description: List all aws regions
*         content:
*          application/json:
*           schema:
*             $ref: '#/components/schemas/AWSRegions'
*       400:
*         description: bad input parameter
*         content:
*          application/json:
*           schema:
*             $ref: '#/components/schemas/ErrorSchema'
 */

// Return a list of all available AWS regions
router.get("/", function (req, res, next) {
  var params = {};
  // Retrieves all regions/endpoints that work with EC2
  const resp = {};
  ec2.describeRegions(params, function (err, data) {
    if (err) {
      resp["status"] = false;
      resp["message"] = err.message;
      console.log("Error", err);
      return res.send(resp);
    } else {
      resp["status"] = true;
      resp["result"] = data.Regions;
      return res.send(resp);
    }
  });
});



/**
 * @swagger
 * components:
 *  schemas:
 *   VPC:
 *    type: object
 *    properties:
 *     status: 
 *      type: boolean
 *     result: 
 *      type: array
 *      items: 
 *        type: object
 *        properties: 
 *         CidrBlock: 
 *          type: string
 *         DhcpOptionsId: 
 *          type: string
 *         State: 
 *           type: string
 *         VpcId: 
 *          type: string
 *         OwnerId: 
 *          type: string
 *         InstanceTenancy: 
 *          type: string
 *         Ipv6CidrBlockAssociationSet: 
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *              CidrBlockAssociationSet: 
 *               type: array
 *               items: 
 *                type: object
 *                properties: 
 *                 AssociationId: 
 *                  type: string
 *                 CidrBlock: 
 *                  type: string
 *                 CidrBlockState: 
 *                  type: object
 *                  properties: 
 *                   State: 
 *                    type: string
 *         IsDefault: 
 *          type: boolean
 *         Tags: 
 *          type: array
 *          items: 
 *             type: string

 * paths:
*   /api/vpc/{region}:
*     get:
*      summary: List's all VPC in subnet
*      tags: [VPC]
*      parameters:
*        - in: path
*          name: region
*          schema:
*            type: string
*          required: true
*          description: region name
*      operationId: listVPC
*      description: |
*       Return a list of all available AWS regions
*      responses:
*       200:
*         description: List all aws regions
*         content:
*          application/json:
*           schema:
*             $ref: '#/components/schemas/VPC'
*       400:
*         description: bad input parameter
*         content:
*          application/json:
*           schema:
*             $ref: '#/components/schemas/ErrorSchema'

*/

// a list of all VPCs within a specific region
router.get("/vpc/:region", function (req, res, next) {
  const params = {
  };
  
  const resp = {};
  console.log(req.params.region);
  const _ec2 = new AWS.EC2({  region: req.params.region });
  _ec2.describeVpcs(params, function (err, data) {
    if (err) {
      resp["status"] = false;
      resp["message"] = err.message;
      console.log(err);
      return res.send(resp);
    } else {
      resp["status"] = true;
      resp["result"] = data.Vpcs;
      return res.send(resp);
    }
  });

  
});



/**
* @swagger
* components:
*  schemas:
*   Subnet:
*    type: object
*    properties:
*     status: 
*      type: boolean
*     result: 
*      type: array
*      items: 
*       type: object
*       properties: 
*        AvailabilityZone: 
*         type: string
*        AvailabilityZoneId: 
*         type: string
*        AvailableIpAddressCount: 
*         type: integer
*         format: int32
*        CidrBlock: 
*         type: string
*        DefaultForAz: 
*         type: boolean
*        MapPublicIpOnLaunch: 
*         type: boolean
*        MapCustomerOwnedIpOnLaunch: 
*         type: boolean
*        State: 
*         type: string
*        SubnetId: 
*         type: string
*        VpcId: 
*         type: string
*        OwnerId: 
*         type: string
*        AssignIpv6AddressOnCreation: 
*         type: boolean
*        Ipv6CidrBlockAssociationSet: 
*         type: array
*         items: 
*           type: object
*        Tags: 
*         type: array
*         items: 
*           type: object
*        SubnetArn: 
*         type: string

 
* paths:
*   /api/subnet/{region}/{vpc}:
*     get:
*      summary: List's all subnets for vpc
*      tags: [Subnet]
*      parameters:
*        - in: path
*          name: region
*          schema:
*            type: string
*          required: true
*          description: region name
*        - in: path
*          name: vpc
*          schema:
*            type: string
*          required: true
*          description: Id of the VPC
*      operationId: listSubnet
*      description: |
*       Return a list of all available AWS regions
*      responses:
*       200:
*         description: List all aws regions
*         content:
*          application/json:
*           schema:
*             $ref: '#/components/schemas/Subnet'
*       400:
*         description: bad input parameter
*         content:
*          application/json:
*           schema:
*             $ref: '#/components/schemas/ErrorSchema'

*/

router.get("/subnet/:region/:vpc", function (req, res, next) {
    var params = {
        DryRun: false,
        Filters: [{
          Name: 'vpc-id', Values: [req.params.vpc]
        }]
      };
    
    const resp = {};
    
    const _ec2 = new AWS.EC2({  region: req.params.region });
    _ec2.describeSubnets(params, function (err, data) {
      if (err) {
        resp["status"] = false;
        resp["message"] = err.message;
        console.log(err);
        return res.send(resp);
      } else {
        resp["status"] = true;
        resp["result"] = data.Subnets;
        return res.send(resp);
      }
    });
  
    
  });

module.exports = router;
