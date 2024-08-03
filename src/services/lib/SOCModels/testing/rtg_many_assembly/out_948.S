.text

#The program checks the ALU instruction in R_type

Main:
		addi    x10 , x0 , 41 
		addi    x1 , x0 , -58 
		addi    x3 , x0 , 179 
		addi    x4 , x0 , 102 
		addi    x16 , x0 , 1 
		blt     x10 , x1 , Less_r 
		bge     x10 , x1 , Bigger_r 
Less_r:
		sub     x28 , x3 , x4 
		and     x25 , x3 , x4 
		add     x25 , x25 , x28 
		srl     x25 , x25 , x16 
		addi    x26 , x0 , 55 
		bne     x25 , x26 , Fail 
Bigger_r:
		or      x28 , x3 , x4 
		xor     x25 , x3 , x4 
		add     x25 , x25 , x28 
		sra     x25 , x25 , x16 
		addi    x26 , x0 , 230 
		bne     x25 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
