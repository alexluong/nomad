import { Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { ActiveService } from './active.service';
import { ActiveModel, IActiveModel } from './interfaces/active.model';

@Controller('lists')
@ApiUseTags('List')
export class ActiveController {

    constructor(private _activeService: ActiveService) {

    }

    @Post('')
    @ApiResponse({
        status: 200,
        type: ActiveModel
    })
    async test(): Promise<IActiveModel> {
        return;
    }
}