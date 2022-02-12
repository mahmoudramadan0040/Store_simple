import { Router,Request,Response } from "express";
import * as controller from '../../controller/users.controller'
const routes =Router();

routes.route('/')
    .get(controller.getMany)
    .post(controller.create )
routes
    .route('/:id')
    .get(controller.getOne)
    .patch(controller.updateOne)
    .delete(controller.deleteOne);
    

export default routes;
