# Troubleshooting Guide

**Hello Gorgeous Med Spa - Common Issues & Solutions**  
**Version:** 1.4.0 | **Updated:** January 31, 2026

---

## Quick Fixes

### "Demo Mode" Warning on Dashboard

**Problem:** Dashboard shows "Demo Mode" or "Supabase not configured"

**Solution:**
1. Check Vercel environment variables are set
2. Redeploy after adding/changing variables
3. Clear browser cache (Cmd+Shift+R)

---

### Can't Log In

**Problem:** Login page doesn't work or shows error

**Solution:**
1. Clear browser cookies for the site
2. Try incognito/private window
3. Check NEXTAUTH environment variables
4. Verify user exists in database

---

### Page Shows "500 Error" or "Something Went Wrong"

**Problem:** Internal server error

**Solution:**
1. Refresh the page
2. Clear browser cache
3. Check Vercel deployment logs
4. Check Supabase for database errors

---

### Blank Calendar

**Problem:** Calendar shows but no time slots or providers

**Solution:**
1. Check if providers exist in database
2. Verify provider is marked as active
3. Check if date is correct
4. Refresh the page

---

## Admin Panel Issues

### Data Not Loading

**Symptoms:**
- Spinning loaders that never stop
- "Error loading data" messages
- Empty tables

**Solutions:**
1. Check internet connection
2. Check Supabase status (supabase.com/status)
3. Verify environment variables
4. Check browser console for errors (F12)
5. Try different browser

---

### Changes Not Saving

**Symptoms:**
- Form submits but nothing happens
- Data reverts after refresh

**Solutions:**
1. Check for validation errors
2. Verify database permissions (RLS)
3. Check browser console for errors
4. Try logging out and back in

---

### Search Not Working

**Symptoms:**
- Search returns no results
- Search is slow

**Solutions:**
1. Ensure at least 2 characters entered
2. Check spelling
3. Wait for debounce (300ms)
4. Try clearing search and re-entering

---

## SMS Issues

### Messages Not Sending

**Symptoms:**
- "Failed to send" errors
- No delivery confirmation

**Solutions:**
1. Verify Telnyx API key in Vercel
2. Check phone number format (10 digits)
3. Verify messaging profile assigned to number
4. Check Telnyx logs for errors
5. Verify number isn't on opt-out list

---

### Messages Marked as Spam

**Symptoms:**
- Clients say they received but marked spam
- Low delivery rates

**Solutions:**
1. Ensure opt-out language included
2. Keep messages under 160 characters
3. Avoid spam trigger words
4. Don't send too frequently
5. Consider 10DLC registration

---

### Wrong Phone Number

**Symptoms:**
- Messages going to wrong recipients
- Complaints from unknown numbers

**Solutions:**
1. Verify client phone numbers in database
2. Check for data entry errors
3. Remove invalid numbers

---

## Client Portal Issues

### Clients Can't Install App

**Symptoms:**
- No install prompt
- "Add to Home Screen" missing

**Solutions:**
1. Must use Safari (iPhone) or Chrome (Android)
2. Must be on HTTPS
3. Try refreshing the page
4. Clear browser cache
5. Check device storage space

---

### Forms Not Submitting

**Symptoms:**
- Form appears stuck
- Submit button doesn't work

**Solutions:**
1. Check all required fields filled
2. Check internet connection
3. Try different browser
4. Clear cookies/cache

---

## Payment Issues (When Stripe Connected)

### Card Declined

**Symptoms:**
- Payment fails with decline message

**Solutions:**
1. Ask client to verify card details
2. Try different card
3. Check for sufficient funds
4. Try manual entry vs swipe/tap
5. Check Stripe dashboard for details

---

### Refund Not Processing

**Symptoms:**
- Refund appears stuck
- Client hasn't received refund

**Solutions:**
1. Check original payment method
2. Refunds take 5-10 business days
3. Verify refund was submitted in Stripe
4. Contact Stripe support if delayed

---

## Email Issues

### Not Receiving Emails

**Symptoms:**
- Confirmations not arriving
- Forgot password emails missing

**Solutions:**
1. Check spam/junk folder
2. Verify email address correct
3. Check DNS records (MX, SPF, DKIM)
4. Test with different email provider

---

### Emails Going to Spam

**Symptoms:**
- Clients report emails in spam

**Solutions:**
1. Verify SPF and DKIM records
2. Avoid spam trigger words
3. Ensure proper "From" address
4. Consider dedicated email service (SendGrid)

---

## Database Issues

### "Error: Row Level Security"

**Symptoms:**
- Data won't save
- Permission denied errors

**Solutions:**
1. Check RLS policies in Supabase
2. Verify user role has access
3. Check policy conditions
4. Contact developer if persistent

---

### Data Sync Issues

**Symptoms:**
- Different data on different devices
- Stale data showing

**Solutions:**
1. Refresh the page
2. Clear browser cache
3. Check for conflicting edits
4. Real-time sync may have delay

---

## Performance Issues

### Pages Loading Slowly

**Symptoms:**
- Long load times
- Timeouts

**Solutions:**
1. Check internet connection
2. Try different browser
3. Clear browser cache
4. Check Vercel/Supabase status
5. Large datasets may need pagination

---

### Mobile Performance

**Symptoms:**
- Slow on phone
- Unresponsive touch

**Solutions:**
1. Close other apps
2. Ensure good network connection
3. Try closing and reopening app
4. Clear app cache

---

## Browser-Specific Issues

### Safari
- Private browsing may cause issues
- Third-party cookies blocked by default
- Try disabling content blockers

### Chrome
- Extensions may interfere
- Try incognito mode
- Clear site data specifically

### Firefox
- Enhanced tracking protection may block
- Try disabling for the site
- Check console for blocked resources

---

## Getting Help

### Before Contacting Support

1. **Document the issue:**
   - What were you trying to do?
   - What error message appeared?
   - What steps did you take?
   - Screenshot if possible

2. **Try basic fixes:**
   - Refresh page
   - Clear cache
   - Try different browser
   - Log out and back in

3. **Check this guide**

### If Issue Persists

1. Check Vercel deployment logs
2. Check Supabase logs
3. Check browser console (F12 → Console)
4. Document any error messages
5. Contact developer with details

---

## Error Code Reference

| Error | Meaning | Solution |
|-------|---------|----------|
| 400 | Bad request | Check form data |
| 401 | Unauthorized | Log in again |
| 403 | Forbidden | Check permissions |
| 404 | Not found | Check URL |
| 500 | Server error | Contact support |
| 502 | Bad gateway | Wait and retry |
| 503 | Service unavailable | Check status pages |

---

## Status Pages

Check these if widespread issues:

| Service | Status Page |
|---------|-------------|
| Vercel | vercel.com/status |
| Supabase | status.supabase.com |
| Telnyx | status.telnyx.com |
| Stripe | status.stripe.com |

---

*If an issue isn't covered here, document it and contact support.*
