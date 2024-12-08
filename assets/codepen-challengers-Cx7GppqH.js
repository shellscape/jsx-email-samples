const codepenChallengers = {
  "html": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html lang=\"en\" dir=\"ltr\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\">\n\n  <head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=yes\">\n    <meta name=\"x-apple-disable-message-reformatting\">\n    <meta name=\"format-detection\" content=\"telephone=no, date=no, address=no, email=no, url=no\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=yes\">\n    <meta name=\"x-apple-disable-message-reformatting\">\n    <meta name=\"format-detection\" content=\"telephone=no, date=no, address=no, email=no, url=no\"><!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG></o:AllowPNG><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->\n  </head>\n\n  <body style=\"font-family:&#x22;Google Sans&#x22;,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;background-color:#505050;margin:0\">\n    <div data-skip=\"true\" style=\"display:none;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden\">#CodePenChallenge: Cubes<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>\n    </div>\n    <table align=\"center\" width=\"100%\" style=\"width:100%;background-color:#191919;margin:0 auto;padding-bottom:30px;z-index:999\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n      <tbody>\n        <tr>\n          <td><img alt=\"codepen\" src=\"https://jsx.email/assets/demo/codepen-challengers.png\" width=\"600\" style=\"border:none;display:block;outline:none;text-decoration:none;margin:auto\"></td>\n        </tr>\n      </tbody>\n    </table>\n    <div style=\"table-layout:fixed;width:100%\">\n      <div style=\"margin:0 auto;max-width:600px\"><span><!--[if mso]><table align=\"center\" width=\"600\" style=\"border-spacing: 0; width:600px;\" role=\"presentation\"><tr><td><![endif]--></span>\n        <table align=\"center\" width=\"100%\" role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"max-width:648px;padding-left:12px;padding-right:12px;margin:0 auto;width:648px;position:relative\">\n          <tbody>\n            <tr style=\"width:100%\">\n              <td align=\"center\">\n                <p style=\"font-size:13px;line-height:24px;margin:0 0 16px 0;background-color:#505050;text-align:center;padding:10px 0 25px 0;position:absolute;width:100%;max-width:648px;top:-28px\"><a style=\"color:#fff;text-decoration:none;cursor:pointer\">View this Challenge on CodePen</a></p>\n                <h1 style=\"background:#f0d361;padding:30px;color:#191919;font-weight:400;margin-bottom:0\"><strong>This week:</strong> #CodePenChallenge: <p style=\"font-size:32px;line-height:24px;margin:4px 0 0 0\">Cubes</p>\n                </h1>\n                <table align=\"center\" width=\"100%\" style=\"margin:0;background:#fff;padding:0 24px\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                  <tbody>\n                    <tr>\n                      <td>\n                        <p style=\"font-size:16px;line-height:24px;margin:16px 0\">The Shape challenge continues!</p>\n                        <p style=\"font-size:16px;line-height:24px;margin:16px 0\">Last week, we kicked things off with round shapes. We \"rounded\" up the Pens from week one in our <a style=\"color:#15c;text-decoration:none;cursor:pointer\">#CodePenChallenge: Round</a> collection.</p>\n                        <p style=\"font-size:16px;line-height:24px;margin:16px 0\">This week, we move on to cubes 🧊</p>\n                        <p style=\"font-size:16px;line-height:24px;margin:16px 0\">Creating cubes in the browser is all about mastery of illusion. Take control of perspective and shadows and you can make the magic of 3D on a flat screen 🧙</p>\n                        <p style=\"font-size:16px;line-height:24px;margin:16px 0\">This week is a fun chance to work on your CSS shape-building skills, or dig into a 3D JavaScript library like Three.js.</p>\n                        <p style=\"font-size:16px;line-height:24px;margin:16px 0\">This week's starter template features an ice cube emoji to help inspire a \"cool\" idea for your Pen. As always, the template is just as jumping off point. Feel free to incorporate the 🧊 in your creation, add more elements, or freeze it out completely and start over from scratch!</p>\n                        <p style=\"font-size:16px;line-height:24px;margin:0 0 40px 0;border:6px solid #ebd473;padding:20px\">💪 <strong>Your Challenge:</strong> <a style=\"color:#15c;text-decoration:none;cursor:pointer\">create a Pen that includes cube shapes.</a></p><img alt=\"codepen\" src=\"https://jsx.email/assets/demo/codepen-cube.png\" width=\"600\" style=\"border:none;display:block;outline:none;text-decoration:none\">\n                        <table align=\"center\" width=\"100%\" style=\"margin-top:40px;margin-bottom:24px;text-align:center;background:#0b112a;color:#fff;padding:35px 20px 30px 20px;border:6px solid #2138c6\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                          <tbody>\n                            <tr>\n                              <td><img alt=\"codepen\" src=\"https://jsx.email/assets/demo/codepen-pro.png\" width=\"250\" style=\"border:none;display:block;outline:none;text-decoration:none;margin:0 auto 30px auto\">\n                                <p style=\"font-size:14px;line-height:24px;margin:16px 0\">CodePen PRO combines a bunch of features that can help any front-end designer or developer at any experience level.</p>\n                                <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse\" role=\"presentation\">\n                                  <tbody>\n                                    <tr>\n                                      <td align=\"left\"><span><!--[if mso]>\n            <v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" style=\"height:42px;v-text-anchor:middle;width:108px;\" arcsize=\"0%\"  strokeweight=\"1px\" fillcolor=#2138c6>\n            <w:anchorlock/>\n            <center style=\"font-size:15px;color:#fff;\">\n            [object Object]\n            </center></v:roundrect>\n            <![endif]--></span><a style=\"-webkit-text-size-adjust:none;border-radius:0;display:inline-block;font-size:15px;line-height:40px;max-width:108px;text-align:center;text-decoration:none;width:100%;background-color:#2138c6;color:#fff;mso-hide:all\"><strong>Learn More</strong></a></td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                              </td>\n                            </tr>\n                          </tbody>\n                        </table>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n                <p style=\"font-size:18px;line-height:1.5;margin:16px 0;background:#f5d247;padding:30px\"><strong>To participate:</strong> <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Create a Pen →</a> and tag it <a style=\"color:#15c;text-decoration:none;cursor:pointer\"><strong>codepenchallenge</strong></a> and<a style=\"color:#15c;text-decoration:none;cursor:pointer\"> <strong>cpc-cubes</strong></a>. We'll be watching and gathering the Pens into a Collection, and sharing on <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Twitter</a> and <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Instagram</a> (Use the #CodePenChallenge tag on Twitter and Instagram as well).</p>\n                <table align=\"center\" width=\"100%\" style=\"margin:0;background:#fff;padding:0 24px\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                  <tbody>\n                    <tr>\n                      <td>\n                        <table align=\"center\" width=\"100%\" role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n                          <tbody style=\"width:100%\">\n                            <tr style=\"width:100%\">\n                              <td style=\"width:50%;padding-right:10px\">\n                                <p style=\"font-size:18px;line-height:1.1;margin:16px 0;font-weight:900\">IDEAS!</p>\n                                <table align=\"center\" width=\"100%\" style=\"padding:20px;margin:0 0 20px 0;border-radius:10px;font-size:36px;text-align:center;background:#fff4c8;border:1px solid #f4d247\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                                  <tbody>\n                                    <tr>\n                                      <td>🌟<p style=\"font-size:13px;line-height:24px;margin:16px 0;text-align:left\">This week we move from 2 dimensions to three! Maybe you could exercise your <a style=\"color:#15c;text-decoration:none;cursor:pointer\">perspective</a> in CSS to create a 3D cube. Or, you can try out creating 3D shapes in JavaScript, using <a style=\"color:#15c;text-decoration:none;cursor:pointer\">WebGL</a> or building a <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Three.js scene</a>.</p>\n                                      </td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                                <table align=\"center\" width=\"100%\" style=\"padding:20px;margin:0 0 20px 0;border-radius:10px;font-size:36px;text-align:center;background:#fff4c8;border:1px solid #f4d247\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                                  <tbody>\n                                    <tr>\n                                      <td>🌟<p style=\"font-size:13px;line-height:24px;margin:16px 0;text-align:left\">There's more to cubes than just six square sides. There are variations on the cube that could be fun to play with this week: <a style=\"color:#15c;text-decoration:none;cursor:pointer\">cuboid shapes</a> are hexahedrons with faces that aren't always squares. And if you want to really push the boundaries of shape, consider the 4 dimensional <a style=\"color:#15c;text-decoration:none;cursor:pointer\">tesseract!</a></p>\n                                      </td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                                <table align=\"center\" width=\"100%\" style=\"padding:20px;margin:0 0 20px 0;border-radius:10px;font-size:36px;text-align:center;background:#fff4c8;border:1px solid #f4d247\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                                  <tbody>\n                                    <tr>\n                                      <td>🌟<p style=\"font-size:13px;line-height:24px;margin:16px 0;text-align:left\">Here's a mind-bending idea that can combine the round shapes from week one with this week's cube theme: <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Spherical Cubes</a> 😳 Solving longstanding mathematical mysteries is probably outside the scope of a CodePen challenge, but you could use front-end tools to explore fitting spheres into cubes, or vice-versa.</p>\n                                      </td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                              </td>\n                              <td style=\"width:50%;padding-left:10px\">\n                                <p style=\"font-size:18px;line-height:1.1;margin:16px 0;font-weight:900;margin-top:-40px\">RESOURCES!</p>\n                                <table align=\"center\" width=\"100%\" style=\"padding:20px;margin:0 0 20px 0;border-radius:10px;font-size:36px;text-align:center;background:#d9f6ff;border:1px solid #92bfd0\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                                  <tbody>\n                                    <tr>\n                                      <td>📖<p style=\"font-size:13px;line-height:24px;margin:16px 0;text-align:left\">Learn all about <a style=\"color:#15c;text-decoration:none;cursor:pointer\">How CSS Perspective Works</a> and how to build a 3D CSS cube from scratch in Amit Sheen's in-depth tutorial for CSS-Tricks. Or, check out stunning examples of WebGL cubes from Matthias Hurrle: <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Just Ice</a> and <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Posing</a>.</p>\n                                      </td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                                <table align=\"center\" width=\"100%\" style=\"padding:20px;margin:0 0 20px 0;border-radius:10px;font-size:36px;text-align:center;background:#d9f6ff;border:1px solid #92bfd0\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                                  <tbody>\n                                    <tr>\n                                      <td>📖<p style=\"font-size:13px;line-height:24px;margin:16px 0;text-align:left\">Want to go beyond the square cube? Draw inspiration from EntropyReversed's <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Pulsating Tesseract</a>, Josetxu's <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Rainbow Cuboid Loader</a>, or Ana Tudor's <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Pure CSS cuboid jellyfish</a>.</p>\n                                      </td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                                <table align=\"center\" width=\"100%\" style=\"padding:20px;margin:0 0 20px 0;border-radius:10px;font-size:36px;text-align:center;background:#d9f6ff;border:1px solid #92bfd0\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                                  <tbody>\n                                    <tr>\n                                      <td>📖<p style=\"font-size:13px;line-height:24px;margin:16px 0;text-align:left\">Did that spherical cubes concept pique your interest? Explore Ryan Mulligan's <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Cube Sphere</a>, Munir Safi's <a style=\"color:#15c;text-decoration:none;cursor:pointer\">3D Sphere to Cube Animation With Virtual Trackball</a> and Ana Tudor's <a style=\"color:#15c;text-decoration:none;cursor:pointer\">Infinitely unpack prism</a> for more mindbending cube concepts that test the boundaries of how shapes interact with each other.</p>\n                                      </td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                              </td>\n                            </tr>\n                          </tbody>\n                        </table>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n                <table align=\"center\" width=\"100%\" style=\"margin:40px 0 120px 0;text-align:center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                  <tbody>\n                    <tr>\n                      <td>\n                        <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse\" role=\"presentation\">\n                          <tbody>\n                            <tr>\n                              <td align=\"left\"><span><!--[if mso]>\n            <v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" style=\"height:62px;v-text-anchor:middle;width:330px;\" arcsize=\"6%\"  strokeweight=\"1px\" fillcolor=#222>\n            <w:anchorlock/>\n            <center style=\"font-size:26px;\">\n            Go to Challenge Page\n            </center></v:roundrect>\n            <![endif]--></span><a style=\"-webkit-text-size-adjust:none;border-radius:4px;display:inline-block;font-size:26px;line-height:60px;max-width:330px;text-align:center;text-decoration:none;width:100%;background-color:#222;mso-hide:all\" color=\"#15c\">Go to Challenge Page</a></td>\n                            </tr>\n                          </tbody>\n                        </table>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n                <table align=\"center\" width=\"100%\" style=\"background:#fff;color:#505050;padding:0 24px;margin-bottom:48px\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n                  <tbody>\n                    <tr>\n                      <td>\n                        <p style=\"font-size:13px;line-height:24px;margin:16px 0\">You can adjust your <a style=\"color:#505050;text-decoration:underline;cursor:pointer\">email preferences</a> any time, or <a style=\"color:#505050;text-decoration:underline;cursor:pointer\">instantly opt out</a> of emails of this kind. Need help with anything? Hit up <a style=\"color:#505050;text-decoration:underline;cursor:pointer\">support</a>.</p>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </td>\n            </tr>\n          </tbody>\n        </table><span><!--[if mso]></td></tr></table><![endif]--></span>\n      </div>\n    </div>\n  </body>\n\n</html>",
  "plain": "View this Challenge on CodePen\n\n\nTHIS WEEK: #CODEPENCHALLENGE:\n\nCUBES\n\nThe Shape challenge continues!\n\nLast week, we kicked things off with round shapes. We \"rounded\" up the Pens from\nweek one in our #CodePenChallenge: Round collection.\n\nThis week, we move on to cubes 🧊\n\nCreating cubes in the browser is all about mastery of illusion. Take control of\nperspective and shadows and you can make the magic of 3D on a flat screen 🧙\n\nThis week is a fun chance to work on your CSS shape-building skills, or dig into\na 3D JavaScript library like Three.js.\n\nThis week's starter template features an ice cube emoji to help inspire a \"cool\"\nidea for your Pen. As always, the template is just as jumping off point. Feel\nfree to incorporate the 🧊 in your creation, add more elements, or freeze it out\ncompletely and start over from scratch!\n\n💪 Your Challenge: create a Pen that includes cube shapes.\n\nCodePen PRO combines a bunch of features that can help any front-end designer or\ndeveloper at any experience level.\n\nLearn More\n\nTo participate: Create a Pen → and tag it codepenchallenge and cpc-cubes. We'll\nbe watching and gathering the Pens into a Collection, and sharing on Twitter and\nInstagram (Use the #CodePenChallenge tag on Twitter and Instagram as well).\n\nIDEAS!\n\n🌟\n\nThis week we move from 2 dimensions to three! Maybe you could exercise your\nperspective in CSS to create a 3D cube. Or, you can try out creating 3D shapes\nin JavaScript, using WebGL or building a Three.js scene.\n\n🌟\n\nThere's more to cubes than just six square sides. There are variations on the\ncube that could be fun to play with this week: cuboid shapes are hexahedrons\nwith faces that aren't always squares. And if you want to really push the\nboundaries of shape, consider the 4 dimensional tesseract!\n\n🌟\n\nHere's a mind-bending idea that can combine the round shapes from week one with\nthis week's cube theme: Spherical Cubes 😳 Solving longstanding mathematical\nmysteries is probably outside the scope of a CodePen challenge, but you could\nuse front-end tools to explore fitting spheres into cubes, or vice-versa.\n\nRESOURCES!\n\n📖\n\nLearn all about How CSS Perspective Works and how to build a 3D CSS cube from\nscratch in Amit Sheen's in-depth tutorial for CSS-Tricks. Or, check out stunning\nexamples of WebGL cubes from Matthias Hurrle: Just Ice and Posing.\n\n📖\n\nWant to go beyond the square cube? Draw inspiration from EntropyReversed's\nPulsating Tesseract, Josetxu's Rainbow Cuboid Loader, or Ana Tudor's Pure CSS\ncuboid jellyfish.\n\n📖\n\nDid that spherical cubes concept pique your interest? Explore Ryan Mulligan's\nCube Sphere, Munir Safi's 3D Sphere to Cube Animation With Virtual Trackball and\nAna Tudor's Infinitely unpack prism for more mindbending cube concepts that test\nthe boundaries of how shapes interact with each other.\n\nGo to Challenge Page\n\nYou can adjust your email preferences any time, or instantly opt out of emails\nof this kind. Need help with anything? Hit up support.",
  "source": "import {\n  Body,\n  Button,\n  Container,\n  Head,\n  Heading,\n  Column,\n  Html,\n  Img,\n  Link,\n  Preview,\n  Section,\n  Text,\n  Row\n} from 'jsx-email';\n\nconst main = {\n  fontFamily: '\"Google Sans\",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',\n  backgroundColor: '#505050',\n  margin: '0'\n};\n\nconst imgHeader = {\n  margin: 'auto'\n};\n\nconst header = {\n  width: '100%',\n  backgroundColor: '#191919',\n  margin: '0 auto',\n  paddingBottom: '30px',\n  zIndex: '999'\n};\n\nconst container = {\n  paddingLeft: '12px',\n  paddingRight: '12px',\n  margin: '0 auto',\n  width: '648px',\n  maxWidth: '648px',\n  position: 'relative' as const\n};\n\nconst challengeLink = {\n  backgroundColor: '#505050',\n  textAlign: 'center' as const,\n  padding: '10px 0 25px 0',\n  fontSize: '13px',\n  position: 'absolute' as const,\n  width: '100%',\n  maxWidth: '648px',\n  top: '-28px',\n  margin: '0 0 16px 0'\n};\n\nconst link = {\n  color: '#fff',\n  cursor: 'pointer'\n};\n\nconst blueLink = {\n  color: '#15c',\n  cursor: 'pointer'\n};\n\nconst heading = {\n  background: '#f0d361',\n  padding: '30px',\n  color: '#191919',\n  fontWeight: '400',\n  marginBottom: '0'\n};\n\nconst section = {\n  margin: '0',\n  background: '#fff',\n  padding: '0 24px'\n};\n\nconst yellowSection = {\n  background: '#f5d247',\n  padding: '30px',\n  fontSize: '18px',\n  lineHeight: '1.5'\n};\n\nconst text = {\n  fontSize: '16px'\n};\n\nconst cubeText = { fontSize: '32px', margin: '4px 0 0 0' };\n\nconst yourChallenge = {\n  fontSize: '16px',\n  border: '6px solid #ebd473',\n  padding: '20px',\n  margin: '0 0 40px 0'\n};\n\nconst sectionPro = {\n  marginTop: '40px',\n  marginBottom: '24px',\n  textAlign: 'center' as const,\n  background: '#0b112a',\n  color: '#fff',\n  padding: '35px 20px 30px 20px',\n  border: '6px solid #2138c6'\n};\n\nconst imagePro = { margin: '0 auto 30px auto' };\n\nconst resourcesTitle = {\n  fontWeight: '900',\n  lineHeight: '1.1',\n  marginTop: '-40px',\n  fontSize: '18px'\n};\n\nconst ideasTitle = {\n  fontWeight: '900',\n  lineHeight: '1.1',\n  fontSize: '18px'\n};\n\nconst ideas = {\n  width: '50%',\n  paddingRight: '10px'\n};\n\nconst resources = {\n  width: '50%',\n  paddingLeft: '10px'\n};\n\nconst card = {\n  padding: '20px',\n  margin: '0 0 20px 0',\n  borderRadius: '10px',\n  fontSize: '36px',\n  textAlign: 'center' as const\n};\n\nconst yellowCard = {\n  ...card,\n  background: '#fff4c8',\n  border: '1px solid #f4d247'\n};\n\nconst blueCard = {\n  ...card,\n  background: '#d9f6ff',\n  border: '1px solid #92bfd0'\n};\n\nconst textCard = {\n  fontSize: '13px',\n  textAlign: 'left' as const\n};\n\nconst goToChallenge = {\n  margin: '40px 0 120px 0',\n  textAlign: 'center' as const\n};\n\nconst footer = {\n  background: '#fff',\n  color: '#505050',\n  padding: '0 24px',\n  marginBottom: '48px'\n};\n\nconst footerText = {\n  fontSize: '13px'\n};\n\nconst footerLink = {\n  textDecoration: 'underline',\n  color: '#505050',\n  cursor: 'pointer'\n};\n\nconst baseUrl = 'https://jsx.email/assets/demo/';\n\nexport const templateName = 'Codepen Challengers';\n\nexport const Template = () => (\n  <Html>\n    <Head />\n    <Preview>#CodePenChallenge: Cubes</Preview>\n    <Body style={main}>\n      <Section style={header}>\n        <Img\n          style={imgHeader}\n          src={`${baseUrl}codepen-challengers.png`}\n          width={600}\n          alt=\"codepen\"\n        />\n      </Section>\n      <Container style={container}>\n        <Text style={challengeLink}>\n          <Link style={link}>View this Challenge on CodePen</Link>\n        </Text>\n\n        <Heading style={heading}>\n          <strong>This week:</strong> #CodePenChallenge: <Text style={cubeText}>Cubes</Text>\n        </Heading>\n\n        <Section style={section}>\n          <Text style={text}>The Shape challenge continues!</Text>\n\n          <Text style={text}>\n            Last week, we kicked things off with round shapes. We \"rounded\" up the Pens from week\n            one in our <Link style={blueLink}>#CodePenChallenge: Round</Link> collection.\n          </Text>\n\n          <Text style={text}>This week, we move on to cubes 🧊</Text>\n\n          <Text style={text}>\n            Creating cubes in the browser is all about mastery of illusion. Take control of\n            perspective and shadows and you can make the magic of 3D on a flat screen 🧙\n          </Text>\n\n          <Text style={text}>\n            This week is a fun chance to work on your CSS shape-building skills, or dig into a 3D\n            JavaScript library like Three.js.\n          </Text>\n\n          <Text style={text}>\n            This week's starter template features an ice cube emoji to help inspire a \"cool\" idea\n            for your Pen. As always, the template is just as jumping off point. Feel free to\n            incorporate the 🧊 in your creation, add more elements, or freeze it out completely and\n            start over from scratch!\n          </Text>\n\n          <Text style={yourChallenge}>\n            💪 <strong>Your Challenge:</strong>{' '}\n            <Link style={blueLink}>create a Pen that includes cube shapes.</Link>\n          </Text>\n\n          <Img src={`${baseUrl}codepen-cube.png`} width={600} alt=\"codepen\" />\n\n          <Section style={sectionPro}>\n            <Img style={imagePro} src={`${baseUrl}codepen-pro.png`} width={250} alt=\"codepen\" />\n\n            <Text>\n              CodePen PRO combines a bunch of features that can help any front-end designer or\n              developer at any experience level.\n            </Text>\n            <Button\n              height={42}\n              width={108}\n              textColor=\"#fff\"\n              fontSize={15}\n              backgroundColor=\"#2138c6\"\n            >\n              <strong>Learn More</strong>\n            </Button>\n          </Section>\n        </Section>\n\n        <Text style={yellowSection}>\n          <strong>To participate:</strong> <Link style={blueLink}>Create a Pen →</Link> and tag it{' '}\n          <Link style={blueLink}>\n            <strong>codepenchallenge</strong>\n          </Link>{' '}\n          and\n          <Link style={blueLink}>\n            {' '}\n            <strong>cpc-cubes</strong>\n          </Link>\n          . We'll be watching and gathering the Pens into a Collection, and sharing on{' '}\n          <Link style={blueLink}>Twitter</Link> and <Link style={blueLink}>Instagram</Link> (Use the\n          #CodePenChallenge tag on Twitter and Instagram as well).\n        </Text>\n\n        <Section style={section}>\n          <Row>\n            <Column style={ideas}>\n              <Text style={ideasTitle}>IDEAS!</Text>\n\n              <Section style={yellowCard}>\n                🌟\n                <Text style={textCard}>\n                  This week we move from 2 dimensions to three! Maybe you could exercise your{' '}\n                  <Link style={blueLink}>perspective</Link> in CSS to create a 3D cube. Or, you can\n                  try out creating 3D shapes in JavaScript, using{' '}\n                  <Link style={blueLink}>WebGL</Link> or building a{' '}\n                  <Link style={blueLink}>Three.js scene</Link>.\n                </Text>\n              </Section>\n\n              <Section style={yellowCard}>\n                🌟\n                <Text style={textCard}>\n                  There's more to cubes than just six square sides. There are variations on the cube\n                  that could be fun to play with this week:{' '}\n                  <Link style={blueLink}>cuboid shapes</Link> are hexahedrons with faces that aren't\n                  always squares. And if you want to really push the boundaries of shape, consider\n                  the 4 dimensional <Link style={blueLink}>tesseract!</Link>\n                </Text>\n              </Section>\n\n              <Section style={yellowCard}>\n                🌟\n                <Text style={textCard}>\n                  Here's a mind-bending idea that can combine the round shapes from week one with\n                  this week's cube theme: <Link style={blueLink}>Spherical Cubes</Link> 😳 Solving\n                  longstanding mathematical mysteries is probably outside the scope of a CodePen\n                  challenge, but you could use front-end tools to explore fitting spheres into\n                  cubes, or vice-versa.\n                </Text>\n              </Section>\n            </Column>\n            <Column style={resources}>\n              <Text style={resourcesTitle}>RESOURCES!</Text>\n\n              <Section style={blueCard}>\n                📖\n                <Text style={textCard}>\n                  Learn all about <Link style={blueLink}>How CSS Perspective Works</Link> and how to\n                  build a 3D CSS cube from scratch in Amit Sheen's in-depth tutorial for CSS-Tricks.\n                  Or, check out stunning examples of WebGL cubes from Matthias Hurrle:{' '}\n                  <Link style={blueLink}>Just Ice</Link> and <Link style={blueLink}>Posing</Link>.\n                </Text>\n              </Section>\n\n              <Section style={blueCard}>\n                📖\n                <Text style={textCard}>\n                  Want to go beyond the square cube? Draw inspiration from EntropyReversed's{' '}\n                  <Link style={blueLink}>Pulsating Tesseract</Link>, Josetxu's{' '}\n                  <Link style={blueLink}>Rainbow Cuboid Loader</Link>, or Ana Tudor's{' '}\n                  <Link style={blueLink}>Pure CSS cuboid jellyfish</Link>.\n                </Text>\n              </Section>\n\n              <Section style={blueCard}>\n                📖\n                <Text style={textCard}>\n                  Did that spherical cubes concept pique your interest? Explore Ryan Mulligan's{' '}\n                  <Link style={blueLink}>Cube Sphere</Link>, Munir Safi's{' '}\n                  <Link style={blueLink}>3D Sphere to Cube Animation With Virtual Trackball</Link>{' '}\n                  and Ana Tudor's <Link style={blueLink}>Infinitely unpack prism</Link> for more\n                  mindbending cube concepts that test the boundaries of how shapes interact with\n                  each other.\n                </Text>\n              </Section>\n            </Column>\n          </Row>\n        </Section>\n\n        <Section style={goToChallenge}>\n          <Button\n            width={330}\n            height={62}\n            fontSize={26}\n            backgroundColor=\"#222\"\n            color=\"#15c\"\n            borderRadius={4}\n          >\n            Go to Challenge Page\n          </Button>\n        </Section>\n\n        <Section style={footer}>\n          <Text style={footerText}>\n            You can adjust your <Link style={footerLink}>email preferences</Link> any time, or{' '}\n            <Link style={footerLink}>instantly opt out</Link> of emails of this kind. Need help with\n            anything? Hit up <Link style={footerLink}>support</Link>.\n          </Text>\n        </Section>\n      </Container>\n    </Body>\n  </Html>\n);\n",
  "sourceFile": "apps/demo/emails/codepen-challengers.tsx",
  "sourcePath": "/Users/powella/code/jsx-email/apps/demo/emails/codepen-challengers.tsx",
  "templateName": "Codepen Challengers"
};

export { codepenChallengers as default };