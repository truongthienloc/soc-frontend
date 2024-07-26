.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x7 , x0 , 158 
		add     x7 , x7 , x7 
Result:
		addi    x30 , x0 , 316 
		bne     x7 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
