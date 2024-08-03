.text

#A function double in RISC-V that, when given an integer x, returns 2x

Main:
		addi    x25 , x0 , 56 
		addi    x30 , x0 , 51 
		or      x30 , x30 , x30 
		sub     x4 , x25 , x30 
		xor     x4 , x4 , x4 
		and     x4 , x0 , x0 
Result:
		add     x0 , x0 , x0 
		bne     x4 , x0 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
