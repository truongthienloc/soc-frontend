.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 10 
		addi    x14 , x0 , -2048 
		slti    x31 , x25 , 163 
		bltu    x25 , x14 , Less_i 
		bgeu    x25 , x14 , Bigger_i 
Less_i:
		ori     x26 , x25 , 160 
		sub     x10 , x14 , x25 
		srai    x10 , x10 , 4 
		and     x10 , x10 , x0 
		addi    x5 , x0 , 0 
		beq     x10 , x5 , Pass 
Bigger_i:
		ori     x26 , x25 , 69 
		sub     x10 , x14 , x25 
		srai    x10 , x10 , 4 
		and     x10 , x10 , x0 
		addi    x5 , x0 , 0 
		beq     x10 , x5 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
