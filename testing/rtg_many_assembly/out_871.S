.text

#The program checks the ALU instruction in R_type

Main:
		addi    x8 , x0 , 80 
		addi    x31 , x0 , -19 
		addi    x26 , x0 , 80 
		addi    x22 , x0 , 94 
		addi    x29 , x0 , 1 
		blt     x8 , x31 , Less_r 
		bge     x8 , x31 , Bigger_r 
Less_r:
		sub     x1 , x26 , x22 
		and     x19 , x26 , x22 
		add     x19 , x19 , x1 
		srl     x19 , x19 , x29 
		addi    x2 , x0 , 33 
		bne     x19 , x2 , Fail 
Bigger_r:
		or      x1 , x26 , x22 
		xor     x19 , x26 , x22 
		add     x19 , x19 , x1 
		sra     x19 , x19 , x29 
		addi    x2 , x0 , 54 
		bne     x19 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
