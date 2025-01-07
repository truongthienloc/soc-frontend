.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x11 , x0 , 154 
		add     x11 , x11 , x11 
Result:
		addi    x21 , x0 , 308 
		bne     x11 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
