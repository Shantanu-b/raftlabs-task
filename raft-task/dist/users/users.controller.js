"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const express_1 = require("express");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(password, username, response) {
        try {
            console.log("In create user");
            const result = await this.usersService.createUser(username, password);
            console.log("back ", result);
            return response.status(common_1.HttpStatus.OK).send(result);
        }
        catch (error) {
            return response.status(common_1.HttpStatus.OK).send(error.response);
        }
    }
    async findUser(query, response) {
        try {
            console.log("In Get user", query);
            const result = await this.usersService.getUser(query.username);
            if (result) {
                return response.status(common_1.HttpStatus.OK).send(result);
            }
            return response.status(common_1.HttpStatus.OK).send("User not found");
        }
        catch (error) {
            return response.status(common_1.HttpStatus.OK).send(error.response);
        }
    }
    async updateUser(username, newUsername, response) {
        try {
            console.log("in Update User");
            const result = await this.usersService.updateUsername(username, newUsername);
            console.log("after", result);
            return response.status(common_1.HttpStatus.OK).send(result);
        }
        catch (error) {
            return response.status(common_1.HttpStatus.OK).send(error.response);
        }
    }
    async deleteUser(username) {
        try {
            console.log("in delete user", username);
            const result = await this.usersService.deleteUser(username);
            console.log("result", result);
            return result;
        }
        catch (error) {
            return express_1.response.status(common_1.HttpStatus.OK).send(error.response);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('password')),
    __param(1, (0, common_1.Body)('username')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('newUsername')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map