.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 148 
		addi    x26 , x0 , 55 
		slt     x5 , x25 , x26 
		bltu    x25 , x26 , Less_i 
		bgeu    x25 , x26 , Bigger_i 
Less_i:
		ori     x20 , x25 , 102 
		sub     x29 , x26 , x25 
		srai    x29 , x29 , 2 
		and     x29 , x29 , x0 
		addi    x8 , x0 , 0 
		beq     x29 , x8 , Pass 
Bigger_i:
		ori     x20 , x25 , 80 
		sub     x29 , x26 , x25 
		srai    x29 , x29 , 3 
		and     x29 , x29 , x0 
		addi    x8 , x0 , 0 
		beq     x29 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
