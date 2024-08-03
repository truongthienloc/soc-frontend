.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x12 , x0 , 160 
		add     x12 , x12 , x12 
Result:
		addi    x6 , x0 , 320 
		bne     x12 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
