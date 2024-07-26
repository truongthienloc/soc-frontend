.text

#The program checks the ALU instruction in R_type

Main:
		addi    x18 , x0 , 65 
		addi    x24 , x0 , -34 
		addi    x29 , x0 , 3 
		addi    x11 , x0 , 150 
		addi    x14 , x0 , 3 
		blt     x18 , x24 , Less_r 
		bge     x18 , x24 , Bigger_r 
Less_r:
		sub     x20 , x29 , x11 
		and     x21 , x29 , x11 
		slt     x21 , x21 , x20 
		srl     x21 , x21 , x14 
		addi    x16 , x0 , -19 
		bne     x21 , x16 , Fail 
Bigger_r:
		or      x20 , x29 , x11 
		xor     x21 , x29 , x11 
		sltu     x21 , x21 , x20 
		sra     x21 , x21 , x14 
		addi    x16 , x0 , 37 
		bne     x21 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
