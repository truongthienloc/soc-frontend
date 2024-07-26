.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 107 
		addi    x23 , x0 , -2048 
		slti    x28 , x26 , 450 
		bltu    x26 , x23 , Less_i 
		bgeu    x26 , x23 , Bigger_i 
Less_i:
		ori     x11 , x26 , 104 
		sub     x15 , x23 , x26 
		srai    x15 , x15 , 3 
		and     x15 , x15 , x0 
		addi    x16 , x0 , 0 
		beq     x15 , x16 , Pass 
Bigger_i:
		ori     x11 , x26 , 190 
		sub     x15 , x23 , x26 
		srai    x15 , x15 , 2 
		and     x15 , x15 , x0 
		addi    x16 , x0 , 0 
		beq     x15 , x16 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
