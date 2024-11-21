import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto, crudQuery: string): Promise<any>;
    findMany(crudQuery: string): Promise<{
        data: any;
        totalRecords: any;
        pageCount: number;
        page: number;
        pageSize: number;
        orderBy: any[];
    }>;
    findOne(id: string, crudQuery: string): Promise<any>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto, crudQuery: string): Promise<any>;
    remove(id: string, crudQuery: string): Promise<any>;
}
