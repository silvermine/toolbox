import { expect } from 'chai';
import { groupBy } from '../../src/utils/group-by';

describe('groupBy', () => {

   interface Person {
      name: string;
      age: number;
      role: string;
      department?: string;
   }

   describe('grouping with function', () => {

      it('groups items by a simple property', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 30, role: 'developer' },
         ];

         const result = groupBy(people, (person) => {
            return person.role;
         });

         expect(result.developer).to.have.lengthOf(2);
         expect(result.designer).to.have.lengthOf(1);
         expect(result.developer?.[0].name).to.strictlyEqual('Alice');
         expect(result.developer?.[1].name).to.strictlyEqual('Charlie');
         expect(result.designer?.[0].name).to.strictlyEqual('Bob');
      });

      it('groups items by computed values', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 35, role: 'developer' },
         ];

         const result = groupBy(people, (person) => {
            return person.age >= 30 ? 'senior' : 'junior';
         });

         expect(result.senior).to.have.lengthOf(2);
         expect(result.junior).to.have.lengthOf(1);
         expect(result.senior?.[0].name).to.strictlyEqual('Alice');
         expect(result.senior?.[1].name).to.strictlyEqual('Charlie');
         expect(result.junior?.[0].name).to.strictlyEqual('Bob');
      });

      it('handles empty array', () => {
         const people: Person[] = [];

         const result = groupBy(people, (person) => {
            return person.role;
         });

         expect(Object.keys(result)).to.have.lengthOf(0);
      });

      it('handles single item', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
         ];

         const result = groupBy(people, (person) => {
            return person.role;
         });

         expect(result.developer).to.have.lengthOf(1);
         expect(result.developer?.[0].name).to.strictlyEqual('Alice');
      });

      it('handles all items in same group', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'developer' },
            { name: 'Charlie', age: 35, role: 'developer' },
         ];

         const result = groupBy(people, (person) => {
            return person.role;
         });

         expect(Object.keys(result)).to.have.lengthOf(1);
         expect(result.developer).to.have.lengthOf(3);
      });

      it('handles all items in different groups', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 35, role: 'manager' },
         ];

         const result = groupBy(people, (person) => {
            return person.role;
         });

         expect(Object.keys(result)).to.have.lengthOf(3);
         expect(result.developer).to.have.lengthOf(1);
         expect(result.designer).to.have.lengthOf(1);
         expect(result.manager).to.have.lengthOf(1);
      });

      it('preserves item order within groups', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 35, role: 'developer' },
            { name: 'David', age: 28, role: 'developer' },
         ];

         const result = groupBy(people, (person) => {
            return person.role;
         });

         expect(result.developer?.[0].name).to.strictlyEqual('Alice');
         expect(result.developer?.[1].name).to.strictlyEqual('Charlie');
         expect(result.developer?.[2].name).to.strictlyEqual('David');
      });

      it('excludes items when function returns undefined', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 30, role: 'developer' },
         ];

         const result = groupBy(people, (person) => {
            return person.role === 'designer' ? undefined : person.role;
         });

         expect(Object.keys(result)).to.have.lengthOf(1);
         expect(result.developer).to.have.lengthOf(2);
         expect(result.designer).to.strictlyEqual(undefined);
      });

      it('returns empty object when all items return undefined', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
         ];

         const result = groupBy(people, () => {
            return undefined;
         });

         expect(Object.keys(result)).to.have.lengthOf(0);
      });

      it('handles mix of defined and undefined return values', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 35, role: 'developer' },
            { name: 'David', age: 28, role: 'designer' },
         ];

         const result = groupBy(people, (person) => {
            return person.age >= 30 ? person.role : undefined;
         });

         expect(Object.keys(result)).to.have.lengthOf(1);
         expect(result.developer).to.have.lengthOf(2);
      });

   });

   describe('grouping with property key', () => {

      it('groups items by string property key', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 30, role: 'developer' },
         ];

         const result = groupBy(people, 'role');

         expect(result.developer).to.have.lengthOf(2);
         expect(result.designer).to.have.lengthOf(1);
         expect(result.developer?.[0].name).to.strictlyEqual('Alice');
         expect(result.developer?.[1].name).to.strictlyEqual('Charlie');
         expect(result.designer?.[0].name).to.strictlyEqual('Bob');
      });

      it('handles empty array with property key', () => {
         const people: Person[] = [];

         const result = groupBy(people, 'role');

         expect(Object.keys(result)).to.have.lengthOf(0);
      });

      it('handles single item with property key', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
         ];

         const result = groupBy(people, 'role');

         expect(result.developer).to.have.lengthOf(1);
         expect(result.developer?.[0].name).to.strictlyEqual('Alice');
      });

   });

   describe('type safety', () => {

      it('returns correct type with function grouping', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
         ];

         const result: Record<string, Person[] | undefined> = groupBy(people, (person) => {
            return person.role;
         });

         expect(result.developer).to.be.an('array');
      });

      it('returns correct type with property key grouping', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
         ];

         const result: Record<string, Person[] | undefined> = groupBy(people, 'role');

         expect(result.developer).to.be.an('array');
      });

      it('works with union types', () => {
         type Status = 'active' | 'inactive' | 'pending';

         interface Item {
            id: number;
            status: Status;
         }

         const items: Item[] = [
            { id: 1, status: 'active' },
            { id: 2, status: 'inactive' },
            { id: 3, status: 'active' },
         ];

         const result: Record<Status, Item[] | undefined> = groupBy(items, 'status');

         expect(result.active).to.have.lengthOf(2);
         expect(result.inactive).to.have.lengthOf(1);
         expect(result.pending).to.strictlyEqual(undefined);
      });

   });

   describe('edge cases', () => {

      it('handles items with undefined optional properties', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer', department: 'engineering' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 30, role: 'developer', department: 'engineering' },
         ];

         const result = groupBy(people, (person) => {
            return person.department || 'none';
         });

         expect(result.engineering).to.have.lengthOf(2);
         expect(result.none).to.have.lengthOf(1);
      });

      it('handles items with empty string keys', () => {
         interface Item {
            id: number;
            category: string;
         }

         const items: Item[] = [
            { id: 1, category: 'electronics' },
            { id: 2, category: '' },
            { id: 3, category: 'electronics' },
         ];

         const result = groupBy(items, 'category');

         expect(result.electronics).to.have.lengthOf(2);
         expect(result['']).to.have.lengthOf(1);
      });

      it('handles items with numeric string keys', () => {
         interface Item {
            id: number;
            code: string;
         }

         const items: Item[] = [
            { id: 1, code: '100' },
            { id: 2, code: '200' },
            { id: 3, code: '100' },
         ];

         const result = groupBy(items, 'code');

         expect(result['100']).to.have.lengthOf(2);
         expect(result['200']).to.have.lengthOf(1);
      });

      it('handles large arrays', () => {
         const items = Array.from({ length: 1000 }, (_, i) => {
            return {
               id: i,
               category: i % 10 === 0 ? 'even' : 'odd',
            };
         });

         const result = groupBy(items, 'category');

         expect(result.even).to.have.lengthOf(100);
         expect(result.odd).to.have.lengthOf(900);
      });

   });

   describe('complex scenarios', () => {

      it('groups nested objects', () => {
         interface Product {
            name: string;
            category: {
               main: string;
               sub: string;
            };
         }

         const products: Product[] = [
            { name: 'Laptop', category: { main: 'electronics', sub: 'computers' } },
            { name: 'Phone', category: { main: 'electronics', sub: 'mobile' } },
            { name: 'Desk', category: { main: 'furniture', sub: 'office' } },
         ];

         const result = groupBy(products, (product) => {
            return product.category.main;
         });

         expect(result.electronics).to.have.lengthOf(2);
         expect(result.furniture).to.have.lengthOf(1);
      });

      it('groups with multiple criteria in function', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 35, role: 'developer' },
         ];

         const result = groupBy(people, (person) => {
            return `${person.role}-${person.age >= 30 ? 'senior' : 'junior'}`;
         });

         expect(result['developer-senior']).to.have.lengthOf(2);
         expect(result['designer-junior']).to.have.lengthOf(1);
      });

      it('can be chained with other array operations', () => {
         const people: Person[] = [
            { name: 'Alice', age: 30, role: 'developer' },
            { name: 'Bob', age: 25, role: 'designer' },
            { name: 'Charlie', age: 35, role: 'developer' },
            { name: 'David', age: 28, role: 'designer' },
         ];

         const developers = people.filter((person) => {
            return person.role === 'developer';
         });

         const result = groupBy(developers, (person) => {
            return person.age >= 30 ? 'senior' : 'junior';
         });

         expect(result.senior).to.have.lengthOf(2);
         expect(result.junior).to.strictlyEqual(undefined);
      });

   });

});
