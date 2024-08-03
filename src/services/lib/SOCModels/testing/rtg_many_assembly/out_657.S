.text

#The program checks the ALU instruction in R_type

Main:
		addi    x6 , x0 , 173 
		addi    x15 , x0 , 74 
		addi    x29 , x0 , 52 
		addi    x19 , x0 , 113 
		addi    x20 , x0 , 2 
		blt     x6 , x15 , Less_r 
		bge     x6 , x15 , Bigger_r 
Less_r:
		sub     x22 , x29 , x19 
		and     x9 , x29 , x19 
		add     x9 , x9 , x22 
		srl     x9 , x9 , x20 
		addi    x17 , x0 , -4 
		bne     x9 , x17 , Fail 
Bigger_r:
		or      x22 , x29 , x19 
		xor     x9 , x29 , x19 
		add     x9 , x9 , x22 
		sra     x9 , x9 , x20 
		addi    x17 , x0 , 46 
		bne     x9 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
