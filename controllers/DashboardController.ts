import { Request, Response } from 'express';
import sequelize from '../models/instance';
import ApexCharts from 'apexcharts';

import {
  Furniture,
  Material,
  Supplier,
  User,
  Category,
} from '../models';

class DashboardController {
  static async home(req: Request, res: Response) {
    try {
      // Example queries to fetch data for charts
      const furnitureCount = await Furniture.count();
      const materialCount = await Material.count();
      const supplierCount = await Supplier.count();
      const userCount = await User.count();

      const recentFurniture = await Furniture.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
      });

      // Fetch all categories
      const categories = await Category.findAll({ raw: true });

      // Manually count furniture for each category
      const categoryCounts = await Promise.all(
        categories.map(async (category) => {
          const count = await Furniture.count({
            where: { categoryId: category.id },
          });
          return { ...category, count };
        })
      );

      // Prepare data for charts
      const chartOptions = {
        chart: {
          type: 'bar',
          height: 350,
        },
        series: [{
          name: 'Furniture Count',
          data: [furnitureCount],
        }],
        xaxis: {
          categories: ['Total Furniture'],
        },
      };

      const donutOptions = {
        chart: {
          type: 'donut',
          height: 350,
        },
        series: [materialCount, supplierCount, userCount],
        labels: ['Materials', 'Suppliers', 'Users'],
      };

      const categoryOptions = {
        chart: {
          type: 'bar',
          height: 350,
        },
        series: [{
          name: 'Furniture Count by Category',
          data: categoryCounts.map((cat) => cat.count),
        }],
        xaxis: {
          categories: categoryCounts.map((cat) => cat.name),
        },
      };

      // Render dashboard view with ApexCharts options
      res.render('dashboard', {
        chartOptions: JSON.stringify(chartOptions),
        donutOptions: JSON.stringify(donutOptions),
        categoryOptions: JSON.stringify(categoryOptions),
        recentFurniture,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default DashboardController;
