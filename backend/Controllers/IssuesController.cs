using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Models.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssuesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IssuesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Issues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IssueModel>>> GetIssues()
        {
            return await _context.Issues.ToListAsync();
        }

        // GET: api/Issues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IssueModel>> GetIssueModel(int id)
        {
            var issueModel = await _context.Issues.FindAsync(id);

            if (issueModel == null)
            {
                return NotFound();
            }

            return issueModel;
        }

        // PUT: api/Issues/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIssueModel(int id, IssueModel issueModel)
        {
            if (id != issueModel.id)
            {
                return BadRequest();
            }

            _context.Entry(issueModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IssueModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Issues
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IssueModel>> PostIssueModel(IssueModel issueModel)
        {
            _context.Issues.Add(issueModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIssueModel", new { id = issueModel.id }, issueModel);
        }

        // DELETE: api/Issues/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssueModel(int id)
        {
            var issueModel = await _context.Issues.FindAsync(id);
            if (issueModel == null)
            {
                return NotFound();
            }

            _context.Issues.Remove(issueModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IssueModelExists(int id)
        {
            return _context.Issues.Any(e => e.id == id);
        }
    }
}
