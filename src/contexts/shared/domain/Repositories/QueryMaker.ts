import { Entity } from '../Types/Entity';
import { JsonDocument } from '../Types/JsonDocument';
import { ConsulterOptions } from './OptionsRepository';
/**
 * Interface that define the methods that creates the queries and consults to the database
 */
export interface QueryMaker<T extends Entity, D extends JsonDocument> {
	/**
	 * Make the query to consult many records on the database
	 * @param model Target model name
	 * @param option The options of the consult
	 * @returns The object or string query
	 */
	findMany(options?: ConsulterOptions): any;

	/**
	 * Make the query that consult one record of the database
	 * @param model Target model name
	 * @param id Identifier of the record
	 * @param options The options of the consult
	 * @return THe object or string query
	 */
	findOne(id: number | string, options?: ConsulterOptions): any;

	/**
	 * Count the records of one entity
	 * @param options
	 */
	count(options?: ConsulterOptions): any;

	/**
	 * Parse on object to convert into a Consulter Options
	 * @param options object ot parse
	 */
	parseOptions(options: any): ConsulterOptions;
}
