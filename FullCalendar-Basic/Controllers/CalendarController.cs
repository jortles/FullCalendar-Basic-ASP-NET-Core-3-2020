using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FullCalendar_Basic.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullCalendar_Basic.Controllers
{
    public class CalendarController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CalendarController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Events.ToListAsync());
        }

        public IActionResult GetEvents()
        {
            var events = _context.Events.Select(e => new
            {
                id = e.EventID,
                title = e.Subject,
                description = e.Description,
                start = e.Start.ToString("YYYY-MM-DD"),
                end = e.End.ToString("YYYY-MM-DD"),
                color = e.ThemeColor,
                allDay = e.IsFullDay
            }).ToList();

            return new JsonResult(events);
        }

        public async Task<IActionResult> AddOrEdit(int id = 0)
        {
            if (id == 0)
                return View(new EventsModel());
            else
            {
                var calendarModel = await _context.Events.FindAsync(id);
                if (calendarModel == null)
                {
                    return NotFound();
                }
                return View(calendarModel);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOrEdit(int id, [Bind("EventID,Subject,Description,Start,End,ThemeColor,IsFullDay")] EventsModel calendarModel)
        {

            if (ModelState.IsValid)
            {
                if (id == 0)
                {
                    _context.Add(calendarModel);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    try
                    {
                        _context.Update(calendarModel);
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!CalendarModelExists(calendarModel.EventID))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }

                return Json(new { isValid = true, html = Helper.RenderRazorViewToString(this, "_ViewAll", _context.Events.ToList()) });

            }
            return Json(new { isValid = false, html = Helper.RenderRazorViewToString(this, "AddOrEdit", calendarModel) });
        }


        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var calendarModel = await _context.Events
                .FirstOrDefaultAsync(m => m.EventID == id);
            if (calendarModel == null)
            {
                return NotFound();
            }

            return View(calendarModel);
        }


        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var calendarModel = await _context.Events.FindAsync(id);
            _context.Events.Remove(calendarModel);
            await _context.SaveChangesAsync();
            return Json(new { html = Helper.RenderRazorViewToString(this, "_ViewAll", _context.Events.ToList()) });
        }

        private bool CalendarModelExists(int id)
        {
            return _context.Events.Any(e => e.EventID == id);
        }
    }
}
