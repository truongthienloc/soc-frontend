.text

#The program checks the ALU instruction in R_type

Main:
		addi    x25 , x0 , 61 
		addi    x18 , x0 , -38 
		addi    x24 , x0 , 47 
		addi    x26 , x0 , 160 
		addi    x31 , x0 , 1 
		blt     x25 , x18 , Less_r 
		bge     x25 , x18 , Bigger_r 
Less_r:
		sub     x7 , x24 , x26 
		and     x28 , x24 , x26 
		add     x28 , x28 , x7 
		srl     x28 , x28 , x31 
		addi    x3 , x0 , -41 
		bne     x28 , x3 , Fail 
Bigger_r:
		or      x7 , x24 , x26 
		xor     x28 , x24 , x26 
		add     x28 , x28 , x7 
		sra     x28 , x28 , x31 
		addi    x3 , x0 , 159 
		bne     x28 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
