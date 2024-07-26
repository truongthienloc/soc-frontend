.text

#The program checks the ALU instruction in R_type

Main:
		addi    x1 , x0 , 0 
		addi    x6 , x0 , -99 
		addi    x19 , x0 , 57 
		addi    x28 , x0 , 107 
		addi    x10 , x0 , 3 
		blt     x1 , x6 , Less_r 
		bge     x1 , x6 , Bigger_r 
Less_r:
		sub     x30 , x19 , x28 
		and     x20 , x19 , x28 
		add     x20 , x20 , x30 
		srl     x20 , x20 , x10 
		addi    x8 , x0 , -2 
		bne     x20 , x8 , Fail 
Bigger_r:
		or      x30 , x19 , x28 
		xor     x20 , x19 , x28 
		add     x20 , x20 , x30 
		sra     x20 , x20 , x10 
		addi    x8 , x0 , 25 
		bne     x20 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
