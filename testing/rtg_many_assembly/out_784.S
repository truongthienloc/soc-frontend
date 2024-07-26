.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x3 , x0 , 113 
		add     x3 , x3 , x3 
Result:
		addi    x1 , x0 , 226 
		bne     x3 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
