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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(username, password) {
        const existingUser = await this.getUser(username);
        console.log("check existing", existingUser);
        if (existingUser) {
            throw new common_1.BadRequestException("User already exists");
        }
        return await this.userModel.create({
            username,
            password,
        });
    }
    async getUser(username) {
        const result = await this.userModel.findOne({ username });
        return result;
    }
    async deleteUser(username) {
        console.log("in service layer", username);
        const result = await this.userModel.deleteOne({ username }).exec();
        return result;
    }
    async updateUsername(username, newUsername) {
        const existingUser = await this.getUser(username);
        console.log("check existing");
        if (!existingUser) {
            throw new common_1.BadRequestException("User does not exists");
        }
        await this.userModel.findOneAndUpdate({ username }, { username: newUsername });
        return true;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map