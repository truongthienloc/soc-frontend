.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x10 , x0 , 94 
		add     x10 , x10 , x10 
Result:
		addi    x4 , x0 , 188 
		bne     x10 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
