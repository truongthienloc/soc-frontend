.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x31 , x0 , 192 
		sub     x31 , x31 , x31 
Result:
		addi    x26 , x0 , 0 
		bne     x31 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
