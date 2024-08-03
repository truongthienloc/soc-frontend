.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x31 , x0 , 138 
		add     x31 , x31 , x31 
Result:
		addi    x23 , x0 , 276 
		bne     x31 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
