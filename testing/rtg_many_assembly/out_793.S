.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x5 , x0 , 63 
		add     x5 , x5 , x5 
Result:
		addi    x9 , x0 , 126 
		bne     x5 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
