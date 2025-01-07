.text

#A function double in RISC-V that, when given an integer x, returns 2x

Double:
		addi    x30 , x0 , 163 
		add     x30 , x30 , x30 
Result:
		addi    x1 , x0 , 326 
		bne     x30 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
