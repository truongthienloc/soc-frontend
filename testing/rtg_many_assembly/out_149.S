.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x14 , x0 , 115 
		add     x14 , x14 , x14 
Result:
		addi    x18 , x0 , 230 
		bne     x14 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
