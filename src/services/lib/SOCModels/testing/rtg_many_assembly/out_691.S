.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x2 , x0 , 62 
		add     x2 , x2 , x2 
Result:
		addi    x26 , x0 , 124 
		bne     x2 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
