import { ApiModelProperty } from '@nestjs/swagger';
import { List } from './active.model';

export class ActiveListParams {
    @ApiModelProperty({
        type: List,
        isArray: true
    })
    lists: List[];
}
