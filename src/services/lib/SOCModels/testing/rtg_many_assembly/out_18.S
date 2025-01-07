.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x17 , x0 , 138 
		add     x17 , x17 , x17 
Result:
		addi    x2 , x0 , 276 
		bne     x17 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
