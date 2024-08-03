.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x18 , x0 , 52 
		add     x18 , x18 , x18 
Result:
		addi    x30 , x0 , 104 
		bne     x18 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
